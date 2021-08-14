# germanbread.github.io

*My personal homepage*

---

## Compiling

### Without Nix

* Make sure you cd'd into the directory where the makefile is located in
* Install `sassc` and `tsc`
* Run `make`

### With Nix

`nix-shell -p sassc nodePackages.typescript --run make`