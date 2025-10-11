import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './generated/a';
import { AddressBookServiceHandlers } from './generated/AddressBookService';

const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../src/a.proto'));

const personProto = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;

const PERSONS: {name: string, age: number}[] = [];

const addressBookHandlers: AddressBookServiceHandlers = {
    AddPerson: (call, callback) => {
        console.log(call)

        let person = {
            name: call.request.name,
            age: call.request.age,
        }

        PERSONS.push(person);
        callback(null, person);
    },

    GetPersonByName: (call, callback) => {
        let person = call.request.name;
        let foundPerson = PERSONS.find(p => p.name === person);
        console.log('foundPerson', foundPerson);
        if(foundPerson) {
            callback(null, foundPerson);
        } else {
            callback(null, {name: '', age: 0});
        }
    }
}

const server = new grpc.Server();

server.addService((personProto.AddressBookService).service, addressBookHandlers);
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
});