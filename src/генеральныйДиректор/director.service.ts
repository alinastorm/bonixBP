/** Vladidmir Nikolaevich */
export class Director {

    /** приносят платежный календарь с заявками
     * нужно или одобрить или сказать на какую дату перенести
     */
    согласоватьПлатежныйКалендарь(data: any) { }

    /** Согласование скидки Заказа покупателя
     * когда ОКС формирует накладные 
     * и когда бренды в заказе покупателя проставляют скидки 
     * Владимир Николаевич утверждает эту скиду
     */
    согласоватьСкидкуЗаказаПокупателя(data: any) { }

    /** отсрочку более 7 дней активирует лично директор или артем чумак на подстраховке */
    согласоватьОтсрочкуПоЗаказуПокупателя() { }

}