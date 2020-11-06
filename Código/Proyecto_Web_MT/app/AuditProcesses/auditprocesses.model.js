const Sequelize = require('sequelize');
const dbConfig = require('../../config/db.config');

const AuditProcess = dbConfig.define('T_AUDITORIAS_PROCESO', {
    FECHA_RECLAMO: {
        type: Sequelize.DATE
    },
    N_AUDITORIA_PROCESO: {
        type: Sequelize.STRING
    },
    DESCRIPCION: {
        type: Sequelize.STRING
    },
    FECHA_BAJA: {
        type: Sequelize.DATE
    }
});
module.exports = AuditProcess;