
import { Бухгалтерия } from 'src/бухгалтерия/бухгалтерия.service';
import { ЭлектроннаяПочта } from 'src/_commons/services/email/email.service';
import { Программа1сУпр } from 'src/_commons/services/1сProgramm/upr.service';

const restartTimeSeconds = +process.env.TIME_RESTART_PERIODICTASKS_SECONDS ?? 10 * 1000


/**
 * Вадим Гончаров декларант
 * Андрей Достанко Специалист по внешнеэкономической деятельности
 * Денис Лекомцев Заведующий сектором - специалист по ВЭД
 * Александр Пикун Специалист по ВЭД
 */
export class VedDepartmentService {
    runTime = ''
    // goods = [{ brend: 'Champion', remains: 0, order: this.заказатьТоварChampionAvista }]
    // tasks = [
    //     { task: this.анализОстатковНаСкладе, timeout: 100 },
    //     { task: this.заказатьТоварChampionAvista, timeout: 100 }, //и тд
    // ]
    constructor(
        private accauntingDepartmentService: Бухгалтерия,
        private upr1cService: Программа1сУпр,
        private emailService: ЭлектроннаяПочта,
        private программа1сУпр: Программа1сУпр
    ) {
        //  this.runScheduledTasks() 
    }

    /** Запустить запланированные задачи */
    // runScheduledTasks() {
    //     setInterval(() => {
    //         this.tasks.forEach(({ task, timeout }) => {
    //             if (new Date().toISOString() > this.runTime + timeout) {
    //                 task()
    //             }
    //         })
    //     }, restartTimeSeconds)
    // }
    // /** Анализ остатков на складе analysGoodsBalance */
    // анализОстатковНаСкладе() {
    //     //TODO Как они анализируют?
    //     this.goods.forEach((product) => {
    //         if (product.remains < 100) {
    //             const count = 100 - product.remains
    //             product.order()
    //         }
    //     })
    // }
    // /** Заказ товара Champion 
    //  * orderItemsChampionAvista
    // */
    // заказатьТоварChampionAvista() {
    //     //TODO Как заказывают?
    // }
    // /** Заказ товара  Avista
    //  * orderItemsChampionAvista
    // */
    // заказатьТоварAvista() {
    //     //TODO Как заказывают?
    // }
    // /** Заказ товара Роснефть
    //  * orderItemsRosNeft
    // */
    // заказатьТоварРоснефть() {
    //     //TODO Как заказывают?
    // }
    // /** Заказ товара Газпромнефть
    //  * orderItemsGazPromNeft
    // */
    // заказатьТоварГазпромНефть() {
    //     //TODO Как заказывают?
    // }
    // /** Заказ товара ТосолСинтез
    //  * orderItemsTosolSintez
    // */
    // заказатьТоварТосолСинтез() {
    //     //TODO Как заказывают?
    // }
    // /** Заказ товара Fuchs
    //  * orderItemsFuchs
    // */
    // заказатьТоварFuchs() {
    //     //TODO Как заказывают?
    // }
    // /** Заказ товара Senfineco orderItemsSenfineco */
    // заказатьТоварSenfineco() {
    //     //TODO Как заказывают?
    // }
    // /** Заказ товара Paloma orderItemsPaloma*/
    // orderItemsPaloma() {
    //     //TODO Как заказывают?
    // }
    // /** Заказ товара Eneos orderItemsEneos*/
    // заказатьТоварEneos() {
    //     //TODO Как заказывают?
    // }
    // /** Заказ товара РБ перекупного orderItemsOverBought*/
    // заказатьТоварПерекупнойРБ() {
    //     //TODO Как заказывают?
    // }
    // /** создает заказ поставщику createOrderSuplier*/
    // создатьДокументЗаказПоставщику() {
    //     //TODO что там внутри ? Кто что? Какие документы формат
    //     this.upr1cService.создатьИПровестиДокументЗаказПоставщику()
    // }
    // /** Создание документов для импорта товаров createImportDocumentsForImportItems
    //  * подготовка документов на ввоз
    // */
    // создатьДокументыДляИмпортаТоваров() {
    //     //TODO Какие документы и как создаются?
    //     //что то делают и в конце уведамляют бухгалтерию

    // }
    // /** уведомить бухгалтерию отправив им заказ поставщику */
    // уведомитьБухгалтериюОтправивПисьмоСЗаказомПоставщику() {
    //     //TODO
    //     const docs = ''
    //     //TODO От кого?
    //     const sender = ''
    //     //TODO От кому?
    //     const receiver = ''
    //     const email = { sender, receiver, data: docs }
    //     this.emailService.отправитьЭлектронноеПисьмо(email)
    // }

    /** Создание номенклатуры */
    cозданиеНоменклатуры() {
        this.программа1сУпр.созданиеСправочникаНоменклатура()
    }

    /** Создание номенклатуры комплектации 
     * поступила заявка идет такая то акция будем делать комплекты
     * логисту скидывают информацию что будет комплектоваться  
     * он создает карточку 
     * ставит вид набор
     * указывает комплектующие из чего состоит набор
    */
    cозданиеНоменклатурыКомплектации() {
        this.программа1сУпр.созданиеСправочникаНоменклатураКомплект()
    }
    /** оформление заявок на отгрузки рос контрагентам
   * логисты или брен д менеджеры приносят счета
   * сегодня артем приносит заявку по закрепленному за ним клиенту 
   * кому он отгружал с боникс рф
   * он принес готовые счета в бумажном виде с номенклатурой и ценами
   * и мне нужно в базе сделать передачу между организациями (реализация на экспорт)
   * я создаю  документ и заполняю его руками
   */
    оформитьЗаявкуНаЭкспортнуюОтгрузку() {
    }

}
