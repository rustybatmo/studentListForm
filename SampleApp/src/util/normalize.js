import selectn from "selectn";

const defaultEntityAssignment = (obj) => obj;
function simple(entity, obj, schema) {
  const id = obj[schema.id];
  const _entity = entity;
  _entity[obj[schema.id]] = schema.entityAssignment(obj);
  return {
    result: id,
  };
}
function array(entity, objs, schema) {
  let ids;
  const _entity = entity;
  if (Array.isArray(objs)) {
    ids = objs.map((obj) => {
      const id = obj[schema.id];
      _entity[id] = schema.entityAssignment(obj);
      return id;
    });
    return {
      result: ids,
    };
  }

  ids = Object.keys(objs).reduce((res, objKey) => {
    const id = objKey;
    _entity[id] = schema.entityAssignment(objs[objKey]);
    res[id] = id;
    return res;
  }, {});
  return {
    result: ids,
  };
}

export function normalize(obj, schema, entities = {}, level = 0) {
  let _level = level;
  const _obj = obj;
  const _entities = entities;
  let _schema = schema;
  if (_schema.map) {
    Object.keys(_schema.map).forEach((key) => {
      if (_schema.group === "object") {
        _level++;
        if (key.split(".").length === 1) {
          if (_obj[key]) {
            const { result } = normalize(
              _obj[key],
              _schema.map[key],
              _entities,
              _level
            );
            _obj[key] = result;
          }
        } else {
          const obj1 = selectn(
            key
              .split(".")
              .slice(0, key.split(".").length - 1)
              .join("."),
            _obj
          );
          const key1 = key.split(".")[key.split(".").length - 1];
          if (obj1[key1]) {
            const { result } = normalize(
              obj1[key1],
              _schema.map[key],
              _entities,
              _level
            );
            obj1[key1] = result;
          }
        }
        _level--;
      } else if (_schema.group === "array") {
        _obj.forEach((iobj) => {
          const _iobj = iobj;
          _level++;
          if (key.split(".").length === 1) {
            if (_iobj[key]) {
              const { result } = normalize(
                _iobj[key],
                _schema.map[key],
                _entities,
                _level
              );
              _iobj[key] = result;
            }
          } else {
            const obj1 = selectn(
              key
                .split(".")
                .slice(0, key.split(".").length - 1)
                .join("."),
              _iobj
            );
            const key1 = key.split(".")[key.split(".").length - 1];
            if (obj1[key1]) {
              const { result } = normalize(
                obj1[key1],
                _schema.map[key],
                _entities,
                _level
              );
              obj1[key1] = result;
            }
          }
          _level--;
        });
      }
    });
  }
  let normalized;
  let unionSchema;
  if (_schema.group === "array") {
    if (typeof _schema.entityName === "string") {
      _entities[_schema.entityName] = _entities[_schema.entityName] || {};
      normalized = array(_entities[_schema.entityName], _obj, _schema);
    } else {
      unionSchema = _schema;
      const aob = [];
      _obj.forEach((obj1) => {
        _schema =
          unionSchema.entityName.union[obj1[unionSchema.entityName.key]];
        _entities[_schema.entityName] = _entities[_schema.entityName] || {};
        normalized = simple(_entities[_schema.entityName], obj1, _schema);
        const ob = {};
        ob.id = normalized.result;
        ob[unionSchema.entityName.key] = obj1[unionSchema.entityName.key];
        aob.push(ob);
      });
      normalized.result = aob;
    }
  } else if (typeof _schema.entityName === "string") {
    _entities[_schema.entityName] = _entities[_schema.entityName] || {};
    normalized = simple(_entities[_schema.entityName], _obj, _schema);
  } else {
    unionSchema = _schema;
    _schema = _schema.entityName.union[_obj[_schema.entityName.key]];
    _entities[_schema.entityName] = _entities[_schema.entityName] || {};
    normalized = simple(_entities[_schema.entityName], _obj, _schema);
    const ob = {};
    ob.id = normalized.result;
    ob[unionSchema.entityName.key] = _obj[unionSchema.entityName.key];
    normalized.result = ob;
  }
  if (_level !== 0) {
    return normalized;
  }

  return { entities: _entities, result: normalized.result };
}

export const normalizer = (schema) => (obj) => normalize(obj, schema);

export function schema(
  entityName,
  { mapping = null, id = "id", group = "object", entityAssignment = null } = {}
) {
  const _entityAssignment = entityAssignment || defaultEntityAssignment;
  return {
    id,
    entityName,
    group,
    map: mapping,
    entityAssignment: _entityAssignment,
  };
}

export function arrayOf(ob) {
  return { ...ob, group: "array" };
}
