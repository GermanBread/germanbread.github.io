# germanbread.github.io

*My personal homepage*

---

## Testing

### Without nix-shell

* install **npm**
* Run `npm run dev`

### With nix-shell

`nix-shell -p nodejs --run 'npm run dev'`

## Compiling

### Without nix-shell

* install **npm** and **make**
* Run `npm run build`

### With nix-shell

`nix-shell -p nodejs gnumake --run 'make'`