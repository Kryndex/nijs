var nijs = require('nijs');

exports.pkg = function(args) {
  return args.stdenv().mkDerivation({
    name : "util-linux-2.25",
    src : args.fetchurl()({
      url : new nijs.NixURL("https://www.kernel.org/pub/linux/utils/util-linux/v2.25/util-linux-2.25.tar.xz"),
      sha256 : "02lqww6ck4p47wzc883zdjb1gnwm59hsay4hd5i55mfdv25mmfj7"
    }),
    
    configureFlags : [
      "--without-ncurses",
      "--disable-use-tty-group",
      "--enable-fs-paths-default=/var/setuid-wrappers:/var/run/current-system/sw/sbin:/sbin"
    ],
    
    buildInputs : [
      args.zlib()
    ],
    
    meta : {
      description : "A set of system utilities for Linux."
    }
  });
};
