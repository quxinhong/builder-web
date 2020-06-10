let defOption = {
  tabSize: 2,
  mode: "sql",
  theme: "3024-night",
  styleActiveLine: true,
  line: true,
  foldgutter: true,
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter","CodeMirror-lint-markers"],
  lineWrapping: true,
  foldGutter: true,
  matchBrackets: true,
  autoCloseBrackets: true,
  readOnly: true,
  extraKeys: {
    "Alt-/": "autocomplete"
  },
  tables: {
    c: ["aabbcc", "dddeee"]
  }
}
let mixin = {
  data() {
    return {
      cmOptions: {...defOption, lineNumbers: true},
      jsonOptions: {...defOption, mode: "application/json"},
      jsonEditOptions: {...defOption, mode: "application/json", readOnly: false}
    };
  },
  methods: {
    setReadOnly(val){
      this.cmOptions.readOnly = val
    },
    makeNotEmpty(msg) {
      return (rule, value, callback) => {
        if (this.$util.isEmpty(value)) {
          callback(new Error(msg));
        } else {
          callback();
        }
      };
    },
    makeNotBlank(msg) {
      return (rule, value, callback) => {
        if (this.$util.isBlank(value)) {
          callback(new Error(msg));
        } else {
          callback();
        }
      };
    },
    validate(form) {
      return new Promise(resolve => {
        form.validate(valid => {
          if (valid) {
            resolve();
          }
        });
      });
    },
    validateBatch(forms) {
      let Promises = forms.map(it => {
        return this.validate(it);
      });
      return Promise.all(Promises);
    },
    confirm(msg, title, options) {
      let obj = options || {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      };
      return this.$confirm(msg, title || "提示", obj);
    }
  }
};
export default mixin;