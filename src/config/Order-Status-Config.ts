import { OrderStatus } from "@/types";

type OrderStatusInfo={
    label:string;
    value:OrderStatus;
    progressValue:number; 
}

export const ORDER_STATUS:OrderStatusInfo[]=[
    {label:'Placed',value:"placed",progressValue:0},
    {label:'Awaiting Restourant confirmation',value:"paid",progressValue:25},
    {label:'in Progress',value:"inProgress",progressValue:50},
    {label:'out for delivery',value:"outForDelivery",progressValue:75},
    {label:'Deliverd',value:"delivered",progressValue:100},
]