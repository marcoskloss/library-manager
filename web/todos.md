## Todos
Some future improvements

- [] New Component: Switcher
- [] Theme Switcher button in AsideMenu
- [] New Component: Header (for List and Details pages)
- [] New Component: Form (for Details page)
- [] New Component: RegistrationForm (for Login page)
- [X] New Feat: Fake Server to CRUD fake data;
- [] New Feat: HTTPUtil - fetch wrapper
- [] Improvement: Add 'error' flag in FakeServer CRUD methods to reject the Promise
- [] Improvement: Refactor FakeServer methods to be able to handle different models and dont only Books
  ```javascript
    // like
    public async store(model, data) {
      function doSomething(this[model]) { ... }      
    }
  ```
