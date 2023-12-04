import { Address } from "./address";
import { Customer } from "./customer";
import { Order } from "./order";
import { OrderItem } from "./order-item";

export interface Purchase {
    customer:Customer;
    shippingAddress: Address;
    billingAddress: Address;
    order:Order;
    orderItems: OrderItem[]; 
}
