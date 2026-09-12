import { defineConfig } from "orval";

export default defineConfig({
  genicheck: {
    input: {
      target: "https://api.genicheck.com/api/docs-json",
      // 백엔드 스웨거의 securitySchemes.access-token 에 OpenAPI 3.0 규격상
      // 허용되지 않는 `in` 속성이 있어 검증이 실패한다. 백엔드 수정 전까지 임시로 검증을 끈다.
      unsafeDisableValidation: true,
    },
    output: {
      target: "./src/api/generated/endpoints",
      schemas: "./src/api/generated/models",
      mode: "tags-split",
      client: "react-query",
      httpClient: "axios",
      mock: false,
      override: {
        mutator: {
          path: "./src/api/mutator/customInstance.ts",
          name: "customInstance",
        },
      },
    },
    hooks: {
      afterAllFilesWrite: "prettier --write",
    },
  },
});
