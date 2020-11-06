const Sequelize = require('sequelize');
const dbConfig = require('../../config/db.config');
const auditProcessModel = require('../AuditProcesses/auditprocesses.model.js');

const Audit = dbConfig.define('T_AUDITORIAS', {
    ID_SESION: {
        type: Sequelize.STRING
    },
    FECHA_AUDITORIA: {
        type: Sequelize.DATE
    },
    OBSERVACIONES: {
        type: Sequelize.STRING(4000)
    },
    ID_CLAVE: {
        type: Sequelize.STRING
    },
    ID_AUDITORIA_PROCESO: {
        type: Sequelize.INTEGER,
        references: {
            model: auditProcessModel,
            key: 'id'
        },
        allowNull: false
    },
});
module.exports = Audit;