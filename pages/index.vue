<template>
    <div>{{ counter }}</div>
    </template>
    <script>
      export default {
        setup(){
          const counter = useCookie('counter')
          counter.value = counter.value || Math.round(Math.random() * 1000)
          return {counter}
        }
      }
    </script>