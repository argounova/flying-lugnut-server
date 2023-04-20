// Mongoose Model
const Car = require ('../models/Car');

const { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLBoolean,
    GraphQLList
} = require ('graphql');

// Car Type
const CarType = new GraphQLObjectType({
    name: 'Car',
    description: 'This represents basic information for a custom hot wheels product',
    fields: () => ({
        id: { type: GraphQLID },
        make: { type: GraphQLString },
        model: { type: GraphQLString },
        trim: { type: GraphQLString },
        exteriorColor: { type: GraphQLString },
        seriesName: { type: GraphQLString },
        inStock: { type: GraphQLBoolean },
        newInventory: { type: GraphQLBoolean },
        featured: { type: GraphQLBoolean },
        clearance: { type: GraphQLBoolean },
        mainImage: { type: GraphQLString },
        detailImage1: { type: GraphQLString },
        detailImage2: { type: GraphQLString },
        detailImage3: { type: GraphQLString },
        etsyLink: { type: GraphQLString },
        detailDescription: { type: GraphQLString },
        price: { type: GraphQLInt },
        thisCarInSeries: { type: GraphQLInt },
        totalCarsInSeries: { type: GraphQLInt },
        stripeId: { type: GraphQLString }
    })
});

// Queries
const RootQueryType = new GraphQLObjectType ({
    name: 'Query',
    description: 'Root Query',
    fields: {
        cars: {
            type: new GraphQLList(CarType),
            description: 'List of all cars',
            resolve(parent, args) {
                return Car.find();
            },
        },
        car: {
            type: CarType,
            description: 'Returns a single car',
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Car.findById(args.id);
            }
        },
        featuredCars: {
            type: new GraphQLList(CarType),
            description: 'List of only featured cars',
            resolve(parent, args) {
                return Car.find({ featured: true });
            }
        },
        inStockCars: {
            type: new GraphQLList(CarType),
            description: 'List of only in stock cars',
            resolve(parent, args) {
                return Car.find({ inStock: true });
            }
        },
        clearanceCars: {
            type: new GraphQLList(CarType),
            description: 'List of only clearance cars',
            resolve(parent, args) {
                return Car.find({ clearance: true });
            }
        },
        newCars: {
            type: new GraphQLList(CarType),
            description: 'List of only new cars',
            resolve(parent, args) {
                return Car.find({ newInventory: true });
            }
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQueryType
});