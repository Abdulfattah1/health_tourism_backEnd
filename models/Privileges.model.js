const db = require("../utilites/db");
const pool = require("../utilites/dbPool.js");
const joiValidator = require("joi");
module.exports = class privileges {
  constructor(privilegeName) {
    this.privilegeName = privilegeName;
  }

  save() {
    return db.execute(`insert into permissions(name) values(?)`, [
      this.privilegeName
    ]);
  }
  static addRoleWithPrivileges() {
    return pool;
  }
  // static addRoleWithPrivileges(roleName, description, privileges) {
  //   pool.getConnection(function(err, connection) {
  //     connection.beginTransaction(function(err) {
  //       if (err) {
  //         //Transaction Error (Rollback and release connection)
  //         connection.rollback(function() {
  //           connection.release();
  //           return "Failure";
  //         });
  //       } else {
  //         connection.query(
  //           "INSERT INTO roles (name) values(?)",
  //           [roleName],
  //           function(err, results) {
  //             if (err) {
  //               //Query Error (Rollback and release connection)
  //               connection.rollback(function() {
  //                 connection.release();
  //                 return "Failure";
  //               });
  //             } else {
  //               if (!results.insertId || results.insertId == 0) {
  //                 connection.rollback(err => {
  //                   if (err) {
  //                     connection.release();
  //                     return "Failure";
  //                   }
  //                 });
  //               } else {
  //                 privileges.forEach(privilege => {
  //                   connection.query(
  //                     `insert into permissions_roles(permission_id,role_id) values(?,?)`,
  //                     [privilege, results.insertId],
  //                     (err, privilege_res) => {
  //                       if (err) {
  //                         connection.rollback(err => {
  //                           connection.release();
  //                           return "Failure";
  //                         });
  //                       }
  //                     }
  //                   );
  //                 });
  //                 connection.commit(err => {
  //                   if (err) {
  //                     connection.rollback(err => {
  //                       connection.release();
  //                       return "Success";
  //                     });
  //                   }
  //                 });
  //               }
  //             }
  //           }
  //         );
  //       }
  //     });
  //   });
  // }

  static getMyprivileges(roleId) {
    return db.execute(
      `
        select permissions.permission_id,permissions.name 
        from permissions 
          inner join permissions_roles on permissions.permission_id = permissions_roles.permission_id
          where permissions_roles.role_id = ?
          ;`,
      [roleId]
    );
  }

  static getAllPrivileges() {
    return db.execute(`select * from permissions`);
  }

  // static deletePervilege(privilegeId) {
  //   return db.execute("delete from roles where role_id = ?", [privilegeId]);
  // }

  static validate(data, type) {
    let schema;
    if (type == "add") {
      schema = joiValidator.object().keys({
        privilegeName: joiValidator.string().required()
      });
    }

    if (type == "delete") {
      schema = joiValidator.object().keys({
        privilegeId: joiValidator.number().required()
      });
    }

    return joiValidator.validate(data, schema);
  }
};