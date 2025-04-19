
    module.exports = function (app) {
        const modelName = 'invoices';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            companyId: { type:  String , required: true, maxLength: null },
itemId: { type:  String , required: true, maxLength: null },
quantity: { type: Number, required: false, max: 10000000 },
subTotal: { type: Number, required: false, max: 10000000 },
discount: { type: Number, required: false, max: 10000000 },
total: { type: Number, required: false, max: 10000000 },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };