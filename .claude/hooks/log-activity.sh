#!/usr/bin/env bash
#
# Claude Code 작업을 "프롬프트 → 바뀐 파일" 형태로 .claude/logs/<날짜>.log 에 기록한다.
#
# 목적: git 에는 없는 정보를 남긴다.
#   - 어떤 요청(프롬프트)이 어떤 파일 변경을 유발했는지
#   - 커밋되지 않고 되돌려진 변경까지 포함한 실제 작업 흐름
# git log/blame 은 "무엇이 바뀌었나"만 알려주고 "왜/무엇을 시켰나"는 모른다.
#
# .claude/settings.json 훅 연결:
#   UserPromptSubmit                                → 프롬프트 헤더
#   PostToolUse(Write|Edit|MultiEdit|NotebookEdit)  → 그 프롬프트로 바뀐 파일들
#
# 계약(contract):
#   - stdin : Claude Code 가 전달하는 JSON 이벤트 페이로드
#   - stdout: 반드시 비워 둔다. (UserPromptSubmit 은 stdout 이 대화/컨텍스트에 노출됨)
#   - exit  : 항상 0. 로깅 실패가 작업을 막지 않는다.

set -u

project_dir="${CLAUDE_PROJECT_DIR:-$(pwd)}"
log_dir="$project_dir/.claude/logs"
log_file="$log_dir/$(date +%Y-%m-%d).log"

mkdir -p "$log_dir" 2>/dev/null || exit 0
payload="$(cat)"

command -v jq >/dev/null 2>&1 || exit 0

line="$(printf '%s' "$payload" | jq -r --arg t "$(date '+%H:%M')" '
  (.hook_event_name // "") as $ev
  | if $ev == "UserPromptSubmit" then
      "\n▸ [\($t)] " + ((.prompt // "") | gsub("\\s+"; " ") | .[0:200])
    elif $ev == "PostToolUse" then
      (.tool_name // "") as $tool
      | ((.tool_input.file_path // .tool_input.notebook_path) // "") as $fp
      | if   $fp == ""       then empty
        elif $tool == "Write" then "    🆕 \($fp)"
        else                       "    ✏️  \($fp)"
        end
    else empty end
' 2>/dev/null || true)"

[ -n "$line" ] && printf '%s\n' "$line" >> "$log_file" 2>/dev/null || true
exit 0
