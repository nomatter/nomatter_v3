class App {
  constructor() {}
  
  init() {
    var test:HTMLElement = document.createElement('div')
    test.innerHTML = "_nomatter's website, wip!"
    document.getElementById('main').appendChild(test)
  }
}