import App from './app';
import HennController from './henns/henns.controller';

const app = new App([new HennController], 5000);
app.listen();