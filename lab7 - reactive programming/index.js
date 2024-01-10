// --- Todo 1 ---
function interval(func) {
  let timer = 1;
  setInterval(() => {
    // mamy coupling - interval ma na sztywno zaszyte w sobie C i D (..i logger)
    func(timer);
    timer++;
  }, 2000);
}

interval(saveCToSessionStorage);
interval(discoverPowerBallNumber);

// --- Todo 2 ---
// https://www.patterns.dev/vanilla/observer-pattern/   <----- observer pattern explanation
class Observable {
  constructor() {
    this.observers = []; // observers: an array of observers that will get notified whenever a specific event occurs
  }

  addObserver(obs) {
    this.observers.push(obs);
  }
  removeObserver(obs) {
    this.observers = this.observers.filter((observer) => observer !== obs);
  }
  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }
}

class Logger {
  static log(data) {
    console.log(`[log from C] ${data}`);
  }
}

const logger = new Logger();
const observable = new Observable();
observable.addObserver(Logger.log);

function saveCToSessionStorage(data) {
  console.log("[reader C]", data);
  const storageData = { data };
  sessionStorage.setItem("C", JSON.stringify(storageData));
  observable.notify(data);
  // brudzimy funkcję loggerem - to nie jest jej funkcjonalność!
}

function discoverPowerBallNumber(data) {
  const number = Math.floor(Math.random() * data * 100);
  console.log("[powerball number]", number);
}
