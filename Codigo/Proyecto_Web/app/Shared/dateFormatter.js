

const formatDate = (dateToFormat) => {
    if (!dateToFormat) return;
    return new Intl.DateTimeFormat('es-AR', { dateStyle: 'full', timeStyle: 'medium' }).format(dateToFormat);
}

module.exports = { formatDate };