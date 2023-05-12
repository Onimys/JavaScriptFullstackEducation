(function () {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const isPrime = async (n) => {
    if (n < 2) {
      return false;
    } else if (n === 2) {
      return true;
    }

    let i = 2;
    const limit = Math.sqrt(n);
    while (i <= limit) {
      if (n % i === 0) {
        return false;
      }
      i += 1;
    }

    return true;
  };

  async function* generator() {
    let n = 1;

    while (true) {
      if (await isPrime(n)) {
        yield await Promise.resolve(n);
      }

      n++;
    }
  }

  async function main() {
    for await (const value of generator()) {
      document.getElementById("seqValue").innerText = value;

      await sleep(1000);
    }
  }

  main().catch((e) => console.error(e));
})();
