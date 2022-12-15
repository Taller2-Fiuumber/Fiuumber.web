
export class PricesRules{ 
    nightShift; //constante que multiplica por Horario del viaje
    duration; //constante que multiplica por Duracion
    distance; //constante que multiplica por  Distancia a recorrer
    dailyTripAmountDriver; //constante que multiplica por Cantidad de viajes en el dia del chofer
    dailyTripAmountPassenger; //constante que multiplica por Cantidad de viajes en el dia del pasajero
    monthlyTripAmountDriver; //constante que multiplica por Cantidad de viajes en el mes del chofer
    monthlyTripAmountPassenger; //constante que multiplica por Cantidad de viajes en el mes del pasajero
    seniorityDriver; //constante que multiplica por Antiguedad en la app del chofer 
    seniorityPassenger; //constante que multiplica por Antiguedad en la app del pasajero
    recentTripAmount; //constante que multiplica por Cantidad de viajes en la ultima ventana temporal
    basePrice; //bajada de bandera

    constructor(
        nightShift,
        duration, 
        distance,
        dailyTripAmountDriver,
        dailyTripAmountPassenger, 
        monthlyTripAmountDriver,
        monthlyTripAmountPassenger, 
        seniorityDriver,
        seniorityPassenger, 
        recentTripAmount,
        basePrice,

    ) {        
        this.nightShift = nightShift;
        this.duration = duration; 
        this.distance = distance;
        this.dailyTripAmountDriver = dailyTripAmountDriver;
        this.dailyTripAmountPassenger = dailyTripAmountPassenger;
        this.monthlyTripAmountDriver = monthlyTripAmountDriver;
        this.monthlyTripAmountPassenger = monthlyTripAmountPassenger;
        this.seniorityDriver = seniorityDriver;
        this.seniorityPassenger = seniorityPassenger;
        this.recentTripAmount = recentTripAmount;
        this.basePrice = basePrice;
    
    }
}
