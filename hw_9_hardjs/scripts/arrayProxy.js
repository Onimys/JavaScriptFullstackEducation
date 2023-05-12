(function () {
  // hack key
  Object.prototype.toString = function () {
    return JSON.stringify(this);
  };

  function objectArray(array) {
    return new Proxy(array, {
      get: function (target, prop) {
        let key;

        try {
          key = JSON.parse(prop);
        } catch (SyntaxError) {
          key = prop;
        }

        if (key.hasOwnProperty("id")) {
          key = key.id;
        } else {
          key = prop;
        }

        return target[key];
      },
    });
  }

  const arr = ["first value", "second value", "third value"];

  let objArr = objectArray(arr);

  console.log(objArr);

  console.log("Index = " + 2, "=>", objArr[2]);
  console.log(
    "Index = {name: 'Second', id: 1}",
    "=>",
    objArr[{ name: "Second", id: 1 }] // сделать не получилось, так как в get приходит строка
  );
})();
