export enum FieldTypeEnum {
  REQUIRED = 'required',
  MAX = 'max',
  MIN = 'min',
  PATTERN = 'pattern',
  MAX_LENGTH = 'maxLength',
  MIN_LENGTH = 'minLength',
  SEARCH = 'search',
  ALLOWED_VALUES = 'allowedValues',
}
export enum RuleTypeEnum {
  INTEGER = 'integer',
  DECIMAL = 'decimal',
  STRING = 'string',
  DATE = 'date',
  DATE_RANGE = 'dateRange',
  MENTION = 'mention',
  REFERENCE = 'reference',
  ARRAY_OF_INTEGER = 'arrayOfInteger',
  ARRAY_OF_DECIMAL = 'arrayOfDecimal',
  ARRAY_OF_STRING = 'arrayOfString',
  ARRAY_OF_DATE = 'arrayOfDate',
  ARRAY_OF_MENTION = 'arrayOfMention',
  ARRAY_OF_REFERENCE = 'arrayOfReference',
}
export interface IFieldRule {
  rule: RuleTypeEnum;
  value: any;
  message: string;
}

export interface ICategoryField {
  code: string;
  name: string;
  description: string;
  type: FieldTypeEnum;
  rules: IFieldRule[];
}

export interface ICategory {
  _id: string;
  icon: string;
  name: string;
  description: string;
  canBePrivate: boolean;
  privateToMentionPeople: boolean;
  fields: ICategoryField[];
}

export interface IInstanceField {
  code: string;
  value: any;
}

export enum RelationTypeEnum {
  PARENT = 'parent',
  FIELD = 'field',
  CONTENT = 'content',
}

export interface IInstanceReference {
  _id: string;
  categoryId: string;
  relation: RelationTypeEnum;
  title: string;
}

export interface IInstance {
  _id: string;
  categoryId: string;
  title: string;
  description: string;
  fields: IInstanceField[];
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  mentions: string[];
  userGroups: string[];
  references: IInstanceReference[];
}

export interface IUser {
  login: string;
  name: string;
  avatar: string;
}

export interface IView {
  type: string;
  query: any;
  state: any;
  settings: any;
}

export interface IViewContext {
  userId: string;
  usersHashmap: { [_id: string]: IUser };
  categoriesHashmap: { [_id: string]: ICategory };
}

export type ApiCallback = (error: any, result: any) => void;

export interface IViewPluginProps {
  view: IView;
  context: IViewContext;
  data: IInstance[];
  onRequestInstanceView: (
    instanceId: IInstance,
    context: IViewContext,
    callback: ApiCallback
  ) => void;
  onSaveInstance: (
    userId: string, // TODO: No debería hacer falta. Meteor.userId()
    instance: IInstance,
    callback: ApiCallback
  ) => void;
  onSaveSate: (state: any, callback: ApiCallback) => void;
}