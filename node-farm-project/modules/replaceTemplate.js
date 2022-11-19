module.exports = (template, product) => {
    for (let key of Object.keys(product)) {
        const re = new RegExp(`\\$\\$%${key.toUpperCase()}%\\$\\$`, "g");
        if (key === 'organic')
            template = template.replace(re, product[key] ? '' : 'not-organic');
        else
            template = template.replace(re, product[key]);
    }
    return template;
}