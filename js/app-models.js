function ProductTemplate(name, qty, category, description){
    this.itemId = Math.floor(Math.random() * 10e16) + '';
    this.name = name || 'UNIDENTIFIED';
    this.qty = qty || 'N/A';
    this.category = category || 'NONE';
    this.description = description || 'NONE';
}

function Phone(name, qty, category, description, OS){
    ProductTemplate.call(this, name, qty, category, description);
    this.category = 'Phone';
    this.OS = OS;
}
Phone.prototype = Object.create(ProductTemplate.prototype);
Phone.prototype.constructor = Phone;

function Computer(name, qty, category, description, hardDrive, ram, processor){
    ProductTemplate.call(this, name, qty, category, description);
    this.category = 'Computer';
    this.hardDrive = hardDrive || 'UNSPECIFIED';
    this.ram = ram || 'UNSPECIFIED';
    this.processor = processor || 'UNSPECIFIED';
}
Computer.prototype = Object.create(ProductTemplate.prototype);
Computer.prototype.constructor = Computer;

function Console(name, qty, category, description, diskSpace, maxFrames){
    ProductTemplate.call(this, name, qty, category, description);
    this.category = 'Console';
    this.diskSpace = diskSpace || 'UNSPECIFIED';
    this.maxFrames = maxFrames || 'UNSPECIFIED';
}
Console.prototype = Object.create(ProductTemplate.prototype);
Console.prototype.constructor = Console;