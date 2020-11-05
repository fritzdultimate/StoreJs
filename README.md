# StoreJs - lightweight State management lib.


**WIP**

### What is StoreJs?
_StoreJs_ is a Javascript lightweight library for shared state management.

  ##### What do I mean by *State Management?*
  Take for instance you're creating a project in which you used modules to divide your application into chucks,
  in such case, it may become hard to share data across all the modules, that is where **StoreJs** comes handy.
  
  ##### Who should use StoreJs?
  everyone! Any developer who wants to implement a shared data across app.
  
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  ###### Enough with the talk, let's dig into examples.
  
  To use StoreJs, you will have to import `storeSetup`,
  `storeSetup` accepts an object which contains your data **state, getters, actions, and mutations**
  e.g
  ```JAVASCRIPT
  import { storeSetup } from '/store.js'
  
  let state = () => ({
      data: {
          name: 'emeka'
      },
      age: 20
  });

  let getters = {
      getData: (state) => {
          return state.data;
      },
      getAge: (state) => {
          return state.age;
      }
  }

  let actions = {
      multiplyAge: () => {
          return {
              method: 'text',
              arguments: 'first|second|third'
          }
      },
  }

  let mutations = {
      text: (state, { first }) => {
          state.age *= first;
      }
  }
  
  let store = {
    state,
    getters,
    actions,
    mutations
  }

  storeSetup({
      // register our state managers
      store
  })
  ```
  
  There is so much thing going on here.<br>
  -- **state** we create our state which holds every data we wants to be shared among our modules...
  -- **getters** holds the property we will be using to retrieve our the data we need from the state, with getters you just get what you need from the state.
  -- **actions** with actions, we just have commit changes to the state through mutation.
  -- **mutation** this is where your main code goes, e.g, you need to do some checking or data manipulation.
  
  ##### Note
  
  In the action, you just have to return a valid mutation property, where the key is "method" and the arguments to be passed to the method as key "arguments".
  e.g 
  ```JAVASCRIPT
    {method: mutationValidProperty, arguments: "...args"}
  ```
  As you may have noticed, `arguments` is a string, you can pass many argument as you want, just seperate each one with "pipe" => `|`
  
  Mutations accepts two parameter
  1. the state, 2. object of arguments passed earlier.
  
  ###### Finally - Very Important.
  
  to be able to use our getters, and actions, we will import the helper functions Asap!.
  ```JAVASCRIPT
  import {storeGetters, storeActions} from '/store.js'
  ```
  
  We have imported our helpers, now we can go ahead and use them.
  
  To use our getter helper to get data of our choice, it's straight forward, just make sure it's in our state.
  
  ```JAVASCRIPT
  let get = storeGetters({
      data: "getData",
          age: 'getAge'
      });
     console.log(get)
     // {age: 20, data: {name: "emeka"}}
 ```
     
  We just got our **age** and **data** obj dataa from our state, so simple.
  Now lets commit a change to the state, by mutating the value of our age.
  
  ```JAVASCRIPT
  storeActions({
      'multiplyAge' : "3"
  })
  ```
  
  The above is how we call our action method, the key been the action method while the value is our arguments. Again, the list of argument is a string which can be seperated by
  "pipe" => `|`, again you can pass as many as you like e.g 
  ```JAVASCRIPT 
  method: '3|fritz|4|noble'
  ``` 
  which is equivalent to 
  ```JAVASCRIPT 
  function method(3, 'fritz', 4, 'noble')
  ```
  
  We have commited a change to our state, next we will get back our age to see if it will mutate.
  
  ```JAVASCRIPT
   let get = storeGetters({
          age: 'getAge'
   });
   console.log(get)
   // {age: 60}
   ```


Yea It got mutated, so our state can now be get and changed.

**StoreJs is aimed to make sharing data across your project a bliss**, 
**Fork it lets't make it more powerful**
     
  
  
