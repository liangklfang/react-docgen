
import {
  Form,
  Select,
  Input,
  Button,
  Row,
  Col,
  DatePicker,
  TreeSelect
} from "antd";
import UserSelect from "./UserSelect";
import PropTypes from "prop-types";
import styles from "./index.less";
const FormItem = Form.Item;
const Option = Select.Option;
class SearchForm extends React.Component {
  static defaultProps = {
    params: {
      id: {
        label: "标签ID",
        type: "input"
      },
      categoryId: {
        label: "分类",
        type: "tree",
        options: []
      },
      status: {
        label: "状态",
        type: "select",
        options: {
          0: "下线",
          1: "上线"
        }
      },
      startDay: {
        label: "开始日期",
        type: "date"
      },
      audit: {
        label: "需要审核",
        type: "select",
        selectNoAll: true,
        defaultValue: "0",
        options: {
          0: "否",
          1: "是"
        }
      },
      updateUser: {
        label: "更新者",
        type: "input",
        placeholder: "请输入工号或花名搜索"
      }
    }
  };
  componentDidMount() {
    if (this.props.preRender) {
      const value = this.props.form.getFieldsValue();
      const onQuerySubmit = this.props.onQuerySubmit;
      onQuerySubmit && onQuerySubmit(value);
    }
  }

  componentWillReceiveProps(nextprops){
    if (nextprops.paramValue!==this.props.paramValue){
       const paramValue = nextprops.paramValue;
       Object.keys(paramValue).map(param=>{
         this.props.form.setFieldsValue({[param]:paramValue[param]})
       })
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onQuerySubmit(values);
      }
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  getFormItem = (params, key) => {
    const type = params[key].type;
    if (type === "input") {
      return (
        <Input
          disabled={params[key].disabled || false}
          style={{ width: "100%" }}
          placeholder={params[key].placeholder || `请输入${params[key].label}`}
        />
      );
    } else if (type === "select") {
      if (!params[key].options) {
        console.warn("表单域中的select没有配置option");
        return;
      }
      let options = [];
      !params[key].selectNoAll &&
        options.push(
          <Option key="" value="">
            默认全部
          </Option>
        );
      Object.keys(params[key].options).map(option => {
        const info = params[key].options[option];
        if (typeof info === "object") {
          options.push(
            <Option value={option} key={option}>
              {info.title}
            </Option>
          );
        } else {
          options.push(
            <Option value={option} key={option}>
              {params[key].options[option]}
            </Option>
          );
        }
      });
      return (
        <Select
          mode={params[key].mode || null}
          style={{ width: "100%" }}
          placeholder={params[key].placeholder || `请选择${params[key].label}`}
        >
          {options}
        </Select>
      );
    } else if (type === "date") {
      return (
        <DatePicker
          style={{ width: "100%" }}
          placeholder={params[key].placeholder || `请输入${params[key].label}`}
        />
      );
    } else if (type === "time") {
      return (
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          placeholder={params[key].placeholder || `请输入${params[key].label}`}
          style={{ width: "100%" }}
        />
      );
    } else if (type === "buc") {
      //人员搜索组件 很常用
      return (
        <UserSelect
          placeholder={params[key].placeholder}
          style={{ width: "100%" }}
          disabled={params[key].disabled || false}
        />
      );
    } else if (type === "tree") {
      return (
        <TreeSelect
          treeData={params[key].treeData}
          treeDefaultExpandAll
          filterTreeNode={(v,node)=>{
            return node.props.title.indexOf(v)>-1
          }}
          allowClear
          multiple={params[key].multiple||false}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder={params[key].placeholder || `请选择${params[key].label}`}
        />
      );
    } else {
      //返回其他复杂的表单域组件 代码自己控制
      return null;
    }
  };

  getDefaultValue = (param)=>{
    switch (param.type) {
      case 'date':
        return param.defaultValue || null;
      case 'time':
        return param.defaultValue || null;
      case 'tree':
        //多选
        if(param.multiple){
          return param.defaultValue || [];
        }
        //单选
        else{
          return param.defaultValue || undefined;
        }
      default:
        return param.defaultValue || '';
    }
  }

  getFields = (params, index) => {
    const { getFieldDecorator } = this.props.form;
    const QueryForm = Object.keys(params).map((key, i) => {
      const initialValue = this.getDefaultValue(params[key])
      return (
        <Col md={8} sm={24} key={i}>
          <FormItem label={params[key].label}>
            {getFieldDecorator(key, { initialValue })(
              this.getFormItem(params, key)
            )}
          </FormItem>
        </Col>
      );
    });
    return (
      <Row key={index} gutter={{ md: 8, lg: 24, xl: 48 }}>
        {QueryForm}
      </Row>
    );
  };

  getFormWrapper = params => {
    const plength = Object.keys(params).length;
    const length = plength % 3 ? plength / 3 + 1 : plength / 3;
    const formRowArr = [];
    for (let i = 0; i < length; i++) {
      const patialParams = {};
      Object.keys(params).some((currentKey, index) => {
        if (index == (i + 1) * 3) {
          return true;
        } else if (index >= i * 3) {
          patialParams[currentKey] = params[currentKey];
        }
      });
      formRowArr.push(this.getFields(patialParams, i));
    }
    return <Form layout="inline">{formRowArr}</Form>;
  };

  getButtons = () => {
    return this.props.btns.map((btn, i) => {
      return (
        <Button
          key={i}
          type={this.props.btns[i]["type"] || "default"}
          className={styles.btn}
          onClick={this.props.btns[i].callbackFunc}
        >
          {btn.name}
        </Button>
      );
    });
  };

  getCpts = () => {
    return this.props.extraCpts.map((cpnt, i) => {
      return (
        <div className="condition-query-module__button" key={i}>
          {cpnt}
        </div>
      );
    });
  };

  render() {
    const params = this.props.params;
    return (
      <div className={styles["searchFormModule"]}>
        {this.getFormWrapper(params)}
        <Row>
          <Col span={24}>
            <Button
              type="primary"
              onClick={this.handleSubmit}
              className={styles.btn}
            >
              查询
            </Button>
            <Button className={styles.btn} onClick={this.handleReset}>
              重置
            </Button>
            {/*渲染剩余的dom 注入业务逻辑*/
            this.props.btns && this.getButtons()}
            {/*渲染额外的自定义组件 注入业务逻辑*/
            this.props.extraCpts && this.getCpts()}
          </Col>
        </Row>
      </div>
    );
  }
}


SearchForm.propTypes = {
  /*
   *表单配置项 key:value形式
   */
  params: PropTypes.object,
  /*
   * 表单初始值，key:value形式
   * params中的defaultValue用于设置表单的initialValue，重置会恢复到这个值；
   * paramValue会进行setFiledsValue操作，重置不会恢复到这个值
  */
  paramValue:PropTypes.object,
// btns
  btns: PropTypes.array,
//onQuerySubmit
  onQuerySubmit: PropTypes.func,
  /**
   * 除了button以外的组件
   */
  extraCpts: PropTypes.array,
  /**
   * 初始化时候是否请求查询接口
   */
  preRender: PropTypes.bool
};

export default SearchForm;
