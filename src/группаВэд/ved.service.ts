import { Injectable } from '@nestjs/common';
import { Бухгалтерия } from 'src/бухгалтерия/accaunting.service';
import { ЭлектроннаяПочта } from 'src/_commons/services/email/email.service';
import { Программа1сУпр } from 'src/_commons/services/1сProgramm/upr.service';

const restartTimeSeconds = +process.env.TIME_RESTART_PERIODICTASKS_SECONDS ?? 10 * 1000

@Injectable()
export class VedDepartmentService {
    runTime = ''
    goods = [{ brend: 'Champion', remains: 0, order: this.заказатьТоварChampionAvista }]
    tasks = [
        { task: this.анализОстатковНаСкладе, timeout: 100 },
        { task: this.заказатьТоварChampionAvista, timeout: 100 }, //и тд
    ]
    constructor(
        private accauntingDepartmentService: Бухгалтерия,
        private upr1cService: Программа1сУпр,
        private emailService: ЭлектроннаяПочта
    ) { this.runScheduledTasks() }

    /** Запустить запланированные задачи */
    runScheduledTasks() {
        setInterval(() => {
            this.tasks.forEach(({ task, timeout }) => {
                if (new Date().toISOString() > this.runTime + timeout) {
                    task()
                }
            })
        }, restartTimeSeconds)
    }
    /** Анализ остатков на складе analysGoodsBalance */
    анализОстатковНаСкладе() {
        //TODO Как они анализируют?
        this.goods.forEach((product) => {
            if (product.remains < 100) {
                const count = 100 - product.remains
                product.order()
            }
        })
    }

    /** Заказ товара Champion Avista
     * orderItemsChampionAvista
    */
    заказатьТоварChampionAvista() {
        //TODO Как заказывают?
    }
    /** Заказ товара Роснефть
     * orderItemsRosNeft
    */
    заказатьТоварРоснефть() {
        //TODO Как заказывают?
    }
    /** Заказ товара Газпромнефть
     * orderItemsGazPromNeft
    */
    заказатьТоварГазпромНефть() {
        //TODO Как заказывают?
    }
    /** Заказ товара ТосолСинтез
     * orderItemsTosolSintez
    */
    заказатьТоварТосолСинтез() {
        //TODO Как заказывают?
    }
    /** Заказ товара Fuchs
     * orderItemsFuchs
    */
    заказатьТоварFuchs() {
        //TODO Как заказывают?
    }
    /** Заказ товара Senfineco orderItemsSenfineco */
    заказатьТоварSenfineco() {
        //TODO Как заказывают?
    }
    /** Заказ товара Paloma orderItemsPaloma*/
    orderItemsPaloma() {
        //TODO Как заказывают?
    }
    /** Заказ товара Eneos orderItemsEneos*/
    заказатьТоварEneos() {
        //TODO Как заказывают?
    }
    /** Заказ товара перекупного orderItemsOverBought*/
    заказатьТоварПерекупной() {
        //TODO Как заказывают?
    }
    /** Создание документов для импорта товаров createImportDocumentsForImportItems*/
    создатьДокументыДляИмпортаТоваров() {
        //TODO Какие документы и как создаются?
        const docs = ''
        //TODO От кого?
        const sender = ''
        //TODO От кому?
        const receiver = ''
        this.emailService.отправитьЭлектронноеПисьмо(sender, receiver, docs)
    }
    /** создает заказ поставщику createOrderSuplier*/
    создатьДокументЗаказПоставщику() {
        //TODO что там внутри ? Кто что? Какие документы формат
        this.upr1cService.создатьИПровестиДокументЗаказПоставщику()
    }

}
