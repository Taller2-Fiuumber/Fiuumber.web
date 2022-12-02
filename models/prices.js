
export class PricesRules{
    time; //Horario del viaje
    duration; //Duracion
    distance; //Distancia a recorrer
    dailyTripAmountDriver; //Cantidad de viajes en el dia del chofer
    dailyTripAmountPassenger; //Cantidad de viajes en el dia del pasajero
    monthlyTripAmountDriver; //Cantidad de viajes en el mes del chofer
    monthlyTripAmountPassenger; //Cantidad de viajes en el mes del pasajero
    seniorityDriver; //Antiguedad en la app del chofer
    seniorityPassenger; //Antiguedad en la app del pasajero
    recentTripAmount; //Cantidad de viajes en la ultima ventana temporal
    confirmationWaitingTime; //Tiempo de espera de confirmacion del viaje para el pasajero
    arrivingWaitingTime; //Tiempo de espera del pasajero
    //Ahre que tendria que cobrar mas si el pasajero hace esperar al chofer

    constructor(
        time,
        duration, 
        distance,
        dailyTripAmountDriver,
        dailyTripAmountPassenger, 
        monthlyTripAmountDriver,
        monthlyTripAmountPassenger, 
        seniorityDriver,
        seniorityPassenger, 
        recentTripAmount,
        confirmationWaitingTime,
        arrivingWaitingTime,

    ) {        
        this.time = time;
        this.duration = duration; 
        this.distance = distance;
        this.dailyTripAmountDriver = dailyTripAmountDriver;
        this.dailyTripAmountPassenger = dailyTripAmountPassenger;
        this.monthlyTripAmountDriver = monthlyTripAmountDriver;
        this.monthlyTripAmountPassenger = monthlyTripAmountPassenger;
        this.seniorityDriver = seniorityDriver;
        this.seniorityPassenger = seniorityPassenger;
        this.recentTripAmount = recentTripAmount;
        this.confirmationWaitingTime = confirmationWaitingTime;
        this.arrivingWaitingTime = arrivingWaitingTime;

    }
}
