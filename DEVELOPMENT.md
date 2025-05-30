## コードチェック

```powershell

ruff check ./backend --fix
& { Push-Location frontend; yarn lint:fix; Pop-Location }

```