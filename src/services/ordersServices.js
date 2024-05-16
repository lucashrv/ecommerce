const {
    users,
    user_addresses,
    carts,
    products,
    payment_method,
    orders,
    purchase_order
} = require("../models");
const {
    handleSearchOne,
    handleSearchAll,
    handleCreate,
    handleDestroy,
    handleError,
    handleVerifyReturned,
    handleSearch,
    handleEveryError,
    handleSearchAdvanced
} = require("./handleServices/handleUtils")

module.exports = new (class OrderService {
    async create(req) {
        const { id } = req.connectedUser
        const { user_addresses_id, payment_method_id } = req.body

        const cart = await handleSearchAll(carts, { user_id: id })
        const user = await handleSearchOne(users, id)
        const userAddress = await handleSearchOne(user_addresses, user_addresses_id)
        const paymentMethod = await handleSearchOne(payment_method, payment_method_id)

        handleEveryError(
            [user, cart[0], userAddress, paymentMethod],
            "Não foi informado um ou mais elementos(cart, user, user_addresses, payment_method)"
        )

        const cartItems = cart.map((value) => { return value })

        const totalValue = cart.reduce((acc, value) => {
            acc = parseFloat(acc) + parseFloat(value.price)
            return acc
        }, 0)

        handleError(
            totalValue > user.balance,
            "Saldo insuficiente!"
        )

        const createOrder = await handleCreate(orders, {
            user_addresses_id,
            payment_method_id,
            user_id: id,
            total_price: totalValue,
            ...req.body
        })

        await handleCreate(purchase_order, {
            products: cartItems,
            user_id: id,
            price_total: totalValue,
            order_id: newCarts.id
        })

        await handleDestroy(carts, { user_id: id });

        const value = parseFloat(user.balance) - totalValue;

        await users.update({ balance: value }, { where: { id } });

        return createOrder;
    }

    async searchOrder(req) {
        const { id } = req.connectedUser;
        const searchOrder = req.query;

        const user = await handleSearchOne(users, id);

        if (!searchOrder.id && user.role !== "admin") {
            const order = await handleSearchAdvanced(
                purchase_order,
                {
                    include: [
                        { model: orders, required: true },
                        {
                            model: users,
                            required: true,
                            attributes: {
                                exclude: [
                                    "id",
                                    "role",
                                    "password",
                                    "created_at",
                                    "updated_at",
                                ],
                            },
                        },
                    ],
                    attributes: {
                        exclude: ["created_at", "updated_at"],
                    },
                },
                { user_id: id }
            );

            return order;
        }

        if (searchOrder.id && user.role !== "admin") {
            const allOrders = await handleSearchOne(orders, searchOrder.id);

            handleError(!allOrders.id, "Ainda nao tem compras!")

            return await handleSearchAdvanced(
                purchase_order,
                {
                    include: [
                        {
                            model: orders,
                            required: true,
                        },
                        {
                            model: users,
                            required: true,
                            attributes: {
                                exclude: [
                                    "id",
                                    "role",
                                    "password",
                                    "created_at",
                                    "updated_at",
                                ],
                            },
                        },
                    ],
                    attributes: {
                        exclude: ["created_at", "updated_at"],
                    },
                },
                { id: searchOrder.id }
            );
        }

        if (user.role === "admin" && searchOrder.id) {
            return await handleSearchAdvanced(purchase_order, {
                include: [
                    {
                        model: orders,
                        required: true,
                    },
                    {
                        model: users,
                        required: true,
                        attributes: {
                            exclude: [
                                "id",
                                "role",
                                "password",
                                "created_at",
                                "updated_at"
                            ]
                        },
                    },
                ],
                attributes: {
                    exclude: ["created_at", "updated_at"],
                },
            });
        }

        if (user.role === "admin" && !searchOrder.id) {
            return await handleSearchAdvanced(purchase_order, {
                include: [
                    {
                        model: orders,
                        required: true,
                    },
                    {
                        model: users,
                        required: true,
                        attributes: {
                            exclude: ["id", "role", "password", "created_at", "updated_at"],
                        },
                    },
                ],
                attributes: {
                    exclude: ["created_at", "updated_at"],
                },
            });
        }
    };

    async update(req) {
        const { id: userId } = req.connectedUser;
        const { id } = req.params;

        const user = await handleSearchOne(users, userId);
        let order = await handleSearchAll(orders, {
            user_id: userId,
            id,
        });

        handleEveryError([user, order], "Sem registros!");

        await orders.update(
            { ...req.body },
            {
                where: {
                    [Op.and]: [{ user_id: userId }, { id }],
                },
            }
        );

        order = await handleSearchAll(orders, { user_id: userId, id });

        handleVerifyReturned(
            order[0].is_delivered,
            orders.update(
                { delivered_at: new Date() },
                {
                    where: {
                        [Op.and]: [{ user_id: userLogin.id }, { id }],
                    },
                }
            )
        );

        return order;
    };

    async updateRemoveProduct(req) {
        const { id: userId } = req.connectedUser;
        const { id } = req.params;

        const checkUser = await handleSearchOne(carts, id);

        const product = await handleSearchOne(products, id);

        const cart = await cart.findAll(id);

        handleError(!checkUser, "Usuario não conectado!");

        handleVerifyReturned(!cart, handleCreate(carts, { id_user: userId }));

        handleError(!product, "Produto não encontrado!");

        const ProductRemoveCart = await handleDestroy(carts, { id_products: id });

        return ProductRemoveCart;
    }
})
