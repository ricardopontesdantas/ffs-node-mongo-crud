const CustomersModel = require('../models/customers')
const { crypto } = require('../utils/password')

const defaultTitle = 'Cadastro de Clientes'

function index(req, res) {
    res.render('register', {
        title: defaultTitle
    })
}

async function add(req, res) {
    const { name, age, email, password } = req.body

    const encryptedPassword = await crypto(password)

    const register = new CustomersModel({ 
        name, 
        age, 
        email, 
        password: encryptedPassword,
    })

    register.save()

    res.render('register', {
        title: defaultTitle,
        message: 'Cadastro realizado com sucesso!'
    })
}

async function list(req, res) {
    const users = await CustomersModel.find()

    res.render('list', {
        title: 'Lista de Clientes',
        users
    })
}

async function formEdit(req, res) {
    const { id } = req.query

    const customer = await CustomersModel.findById(id)

    res.render('edit', {
        title: 'Editar Usuário',
        customer,
    })
}

async function edit(req, res) {
    const { name, age, email } = req.body

    const { id } = req.params
    
    const customer = await CustomersModel.findById(id)

    customer.name = name
    customer.age = age
    customer.email = email

    customer.save()

    res.render('edit', {
        title: 'Editar Usuário',
        customer,
        message: 'Cliente atualizado com sucesso!'
    })
}

async function remove(req, res) {
    const { id } = req.params

    const remove = await CustomersModel.deleteOne({
        _id: id
    })

    if (remove.deletedCount > 0) {
        res.redirect('/list')
    }
}

module.exports = {
    index,
    add,
    list,
    formEdit,
    edit,
    remove,
}