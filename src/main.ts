import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faCircle,
  faCircleXmark,
  faCircleCheck,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";

library.add(faCircleXmark, faCircle, faCircleCheck, faPenToSquare);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
