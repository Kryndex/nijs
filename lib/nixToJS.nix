{stdenv}:
expr:

let
  nixToJS = expr:
    if expr == null then "null"
  else
    if builtins.isBool expr then
      if expr then "true" else "false"
    else if builtins.isInt expr then builtins.toString expr
    else if builtins.isString expr then "\"${expr}\""
    else if builtins.isList expr then "[ ${stdenv.lib.concatMapStrings (elem: nixToJS elem + ",\n") expr} ]"
    else if builtins.isAttrs expr then "{ ${stdenv.lib.concatMapStrings (elem: elem + " : ${nixToJS (builtins.getAttr elem expr)},\n") (builtins.attrNames expr)} }"
    else throw "Cannot convert the expression to JavaScript!";
in
nixToJS expr