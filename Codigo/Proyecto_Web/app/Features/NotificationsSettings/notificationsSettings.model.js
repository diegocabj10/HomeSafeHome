const Sequelize = require('sequelize');
const dbConfig = require('../../../config/db.config');
const signalModel = require('../Signals/signals.model');
const NotificationSetting = dbConfig.define('NotificationsSettings', {
    signalId: {
        type: Sequelize.INTEGER,
        references: {
            model: signalModel,
            key: 'id'
        },
        allowNull: false
    },
    valueFrom: {
        type: Sequelize.INTEGER
    },
    valueTo: {
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING
    },
    message: {
        type: Sequelize.STRING
    }
});

NotificationSetting.sync().then(
    async() => {
        await signalModel.findOrCreate({
            defaults: { id: 1, name: 'MONOXIDO DE CARBONO', createdAt: Date.now(), updatedAt: Date.now() },
            where: { id: 1 }
        });
        await signalModel.findOrCreate({
            defaults: { id: 2, name: 'LUZ', createdAt: Date.now(), updatedAt: Date.now() },
            where: { id: 2 }
        });
        await signalModel.findOrCreate({
            defaults: { id: 3, name: 'PUERTA', createdAt: Date.now(), updatedAt: Date.now() },
            where: { id: 3 }
        });
        await signalModel.findOrCreate({
            defaults: { id: 4, name: 'GARAGE', createdAt: Date.now(), updatedAt: Date.now() },
            where: { id: 4 }
        });
        NotificationSetting.findOrCreate({
            defaults: { id: 1, signalId: 3, valueFrom: 0, valueTo: 0, title: 'Apertura de la puerta', message: 'Se ha detectado una apertura de la puerta.', createdAt: Date.now(), updatedAt: Date.now() },
            where: { id: 1 }
        });
        NotificationSetting.findOrCreate({
            defaults: { id: 2, signalId: 3, valueFrom: 1, valueTo: 1, title: 'Cierre de la puerta', message: 'Se ha detectado un cierre de la puerta', createdAt: Date.now(), updatedAt: Date.now() },
            where: { id: 2 }
        });
        NotificationSetting.findOrCreate({
            defaults: { id: 3, signalId: 1, valueFrom: 35, valueTo: 99, title: 'Monoxido de Carbono', message: 'Presencia de CO (+0.0035%): Dolor de cabeza y mareos en el plazo de 6 a 8 horas de exposición constante', createdAt: Date.now(), updatedAt: Date.now() },
            where: { id: 3 }
        });
        NotificationSetting.findOrCreate({
            defaults: { id: 4, signalId: 1, valueFrom: 100, valueTo: 199, title: 'Monoxido de Carbono', message: 'Presencia de CO (+0.01%): Cefalea leve en 2 o 3 horas.', createdAt: Date.now(), updatedAt: Date.now() },
            where: { id: 4 }
        });
        NotificationSetting.findOrCreate({
            defaults: { id: 5, signalId: 1, valueFrom: 200, valueTo: 399, title: 'Monoxido de Carbono', message: 'Presencia de CO (+0.02%): En 2 a 3 horas se puede observar un leve dolor de cabeza, náuseas, vértigo y síntomas mentales (pérdida de razonamiento).', createdAt: Date.now(), updatedAt: Date.now() },
            where: { id: 5 }
        });
        NotificationSetting.findOrCreate({
            defaults: { id: 6, signalId: 1, valueFrom: 400, valueTo: 799, title: 'Monoxido de Carbono', message: 'Presencia de CO (+0.04%): En 2 a 3 horas se puede observar un fuerte dolor de cabeza, incoordinación muscular, debilidad, vómitos y colapso.', createdAt: Date.now(), updatedAt: Date.now() },
            where: { id: 6 }
        });
        NotificationSetting.findOrCreate({
            defaults: { id: 7, signalId: 1, valueFrom: 800, valueTo: 1099, title: 'Monoxido de Carbono', message: 'Presencia de CO (+0.08%): Fuerte dolor de cabeza, debilidad, vómitos, mareos, náuseas, convulsiones y colapso dentro de los 45 minutos.', createdAt: Date.now(), updatedAt: Date.now() },
            where: { id: 7 }
        });
        NotificationSetting.findOrCreate({
            defaults: { id: 8, signalId: 1, valueFrom: 1100, valueTo: 1599, title: 'Monoxido de Carbono', message: 'Presencia de CO (+0.11%): Después de 1.5 a 3 horas se puede observar coma. (La respiración es aún bastante buena a no ser que el envenenamiento se haya prolongado).', createdAt: Date.now(), updatedAt: Date.now() },
            where: { id: 8 }
        });
        NotificationSetting.findOrCreate({
            defaults: { id: 9, signalId: 1, valueFrom: 1600, valueTo: 3199, title: 'Monoxido de Carbono', message: 'Presencia de CO (+0.16%): Cefalea, taquicardia, mareos y náuseas dentro de los 20 minutos; la muerte en menos de 2 horas.', createdAt: Date.now(), updatedAt: Date.now() },
            where: { id: 9 }
        });
        NotificationSetting.findOrCreate({
            defaults: { id: 10, signalId: 1, valueFrom: 3200, valueTo: 4999, title: 'Monoxido de Carbono', message: 'Presencia de CO (+0.32%): Cefaleas, mareos y náuseas en 5 o 10 minutos. Muerte dentro de los 30 minutos.', createdAt: Date.now(), updatedAt: Date.now() },
            where: { id: 10 }
        });
        NotificationSetting.findOrCreate({
            defaults: { id: 11, signalId: 1, valueFrom: 5000, valueTo: 6399, title: 'Monoxido de Carbono', message: 'Presencia de CO (+0.5%): Después de 2 a 15 minutos se puede producir la muerte.', createdAt: Date.now(), updatedAt: Date.now() },
            where: { id: 11 }
        });
        NotificationSetting.findOrCreate({
            defaults: { id: 12, signalId: 1, valueFrom: 6400, valueTo: 12799, title: 'Monoxido de Carbono', message: 'Presencia de CO (+0.64%): Dolor de cabeza y mareos en 1 o 2 minutos. Convulsiones, paro respiratorio y muerte en menos de 15 minutos.', createdAt: Date.now(), updatedAt: Date.now() },
            where: { id: 12 }
        });
        NotificationSetting.findOrCreate({
            defaults: { id: 13, signalId: 1, valueFrom: 12800, valueTo: 99999, title: 'Monoxido de Carbono', message: 'Presencia de CO (+1.28%): Inconsciencia después de 2 ó 3 respiraciones. Muerte en menos de 3 minutos.', createdAt: Date.now(), updatedAt: Date.now() },
            where: { id: 13 }
        });
    });
module.exports = NotificationSetting;
