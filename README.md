# 初始化根目錄(以下方式擇一)

## 方式 1: 執行自動化腳本(需以系統管理員運行 CMD)

```cmd
npm run setup
```

## 方式 2: 手動初始化根目錄(以下指令擇一)

### 使用`Corepack`方式(與自動化腳本方式相同，需以系統管理員運行 CMD):

```cmd
corepack enable
pnpm install
```

### 或者，直接全域安裝`pnpm`:

```cmd
npm install -g pnpm
pnpm install
```

# 新增專案

## 方式 1: 運行自動化腳本

到要建立專案的資料夾內

```cmd
pnpm copy
```

> 如果出現「**Command failed with exit code 3221225477.**」，或者出現亂碼：
>
> - 請檢查系統預設編碼是否為**UTF-8**
> - 避免使用中文路徑/資料夾名稱。

## 方式 2: 手動建立專案

從`/templates/Astro`複製到專案內，然後調整以下檔案中的路徑：

1. **astro.config.mjs**
   ```js
   import base from '{...}/packages/astro-config/index.mjs'
   ```
2. **tsconfig.json**
   ```json
   {
     "extends": "{...}/packages/tsconfig/index.json"
   }
   ```

# 查看組件目錄(以下方式擇一)

## 方式 1: 執行自動化腳本(以下指令擇一)

```cmd
pnpm storybook
```

或者

```cmd
pnpm demo
```

## 方式 2: 手動執行

1. 在根目錄先安裝（首次或有更新時）：

   ```cmd
   pnpm install
   ```

2. 進入 `/apps/storybook`，選一種方式啟動：

   - 開發模式：

     ```cmd
     pnpm dev
     ```

   - 預覽模式（需先**build**）：

     ```cmd
     pnpm preview
     ```
