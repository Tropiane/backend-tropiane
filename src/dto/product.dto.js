export default class ProductDto{
    constructor(data, image){
        this.title = data.title;
        this.description = data.description;
        this.price = Number(data.price);
        this.thumbnail = image;
        this.code = data.code;
        this.stock = Number(data.stock);
        this.category = data.category;
        this.status = Boolean(data.status);
        this.date = Date.now();
    }
}