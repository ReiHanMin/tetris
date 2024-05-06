import { createApp } from 'vue';
import App from './components/App.vue'; // Import your main App.vue
import store from './store/index'; // Ensure this path is correct and the file exports the store properly

const app = createApp(App); // Pass App into createApp
app.use(store); // Use the Vuex store

// You can also register global components here if needed
// import ExampleComponent from './components/ExampleComponent.vue';
// app.component('example-component', ExampleComponent);

app.mount('#app'); // This should mount your Vue application
