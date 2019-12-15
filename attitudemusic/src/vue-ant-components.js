import Vue from 'vue';
import {
  Menu,
  Table,
  DatePicker,
  Select,
  Checkbox,
  Radio,
  Steps,
  Form,
  Layout,
  Button,
  Row,
  Col,
  Card,
  Progress,
  Tabs,
  Spin,
  Icon,
  Tooltip,
  Cascader,
  Modal,
  Input,
  Tree,
  Popover,
  message,
  Pagination,
  Tag,
  Upload,
  Dropdown,
  Switch,
  Popconfirm,
  Breadcrumb,
} from 'ant-design-vue';

Vue.use(Menu);
Vue.use(Table);
Vue.use(DatePicker);
Vue.use(Select);
Vue.use(Checkbox);
Vue.use(Radio);
Vue.use(Steps);
Vue.use(Form);
Vue.use(Layout);
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Progress);
Vue.use(Tabs);
Vue.use(Spin);
Vue.use(Icon);
Vue.use(Tooltip);
Vue.use(Cascader);
Vue.use(Modal);
Vue.use(Input);
Vue.use(Tree);
Vue.use(Popover);
Vue.use(Pagination);
Vue.use(Tag);
Vue.use(Upload);
Vue.use(Dropdown);
Vue.use(Switch);
Vue.use(Popconfirm);
Vue.use(Breadcrumb);

Vue.prototype.$message = message;
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$info = Modal.info;

message.config({
  // maxCount: 3
});
