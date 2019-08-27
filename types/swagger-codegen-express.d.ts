export function callEnsureValid(data: any): any;
export namespace common {
  function addModel(model: any, inputOptions: any): void;
  function addResponse(response: any, options: any): void;
  function addResponseHeader(responseHeader: any, options: any): void;
  function addTag(tag: any, options: any): void;
  namespace parameters {
    function addBody(body: any, options: any): void;
    function addFormData(formData: any, options: any): void;
    function addHeader(header: any, options: any): void;
    function addPath(path: any, options: any): void;
    function addQuery(query: any, options: any): void;
  }
}
export function compile(): void;
export function initialise(app: any, options: any): void;
export function initialize(app: any, options: any): void;
export function json(): any;
export function reset(): void;
export function swaggerise(item: any): void;
export function swaggerize(item: any): void;
export function validate(): any;
