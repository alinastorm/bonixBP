import { OKS } from '../../ГруппаОкс/oks.service';
import { ПриходыЗаказыExcel } from "../../_commons/services/excel/приходыЗаказыExcel.service"
import { Upr1C } from 'src/_commons/services/1сProgramm/upr1c.service';
import { SBS } from 'src/_commons/services/сбс/sbs.service';
/**
 * торг преды-холодные звонки или в поля или на телефоне
 * 
 * Андрей Макеев Заместитель начальника отдела продаж
 * Николай Демидович Заместитель начальника отдела продаж
 * Виталий Догуревич Заместитель начальника отдела продаж
 * Ксения Лёгкая Специалист по продажам
 */
export class B2B {

    private приходыЗаказыExcel: ПриходыЗаказыExcel

    constructor(
        private группаОкс: OKS,
        private программа1сУпр: Upr1C,
        private отчетыСбс: SBS,
    ) { }

    /**Уведомление о готовности товара к продаже productIsReadyForSaleNotification */
    получитьУведомлениеОГотовностиТовара() {
        //TODO Что они с этим уведомлением делают?
    }

    /**
     * Окс получают заявку от торгового представителя B2C/b2b
     * создают реализацию по моей просьбе (прошу не должны)
     */
    оформитьЗаявкуРеализицииЧерезСнаб() {
        const заявкаПоЗакрепленномуКонтрагенту = {}
        this.группаОкс.принятьЗаявкуНаОтгрузкуКонтрагентуЧерезСнабИОформитьРеализацию(заявкаПоЗакрепленномуКонтрагенту)
    }
    /**
     * Окс получают заявку от торгового представителя B2C/b2b
     * создают реализацию по моей просьбе (прошу не должны)
     */
    оформитьЗаявкуРеализицииСнабЧерезБоникс() {
        const заявкаПоЗакрепленномуКонтрагенту = {}
        this.группаОкс.принятьЗаявкуНаОтгрузкуКонтрагентуСнабЧерезБониксИОформитьРеализацию(заявкаПоЗакрепленномуКонтрагенту)
    }
    /** В этом файле торг преды оставляют заказ когда им что то нужно. Товар которого нет на остатке и нужно что бы не забыли его включить 
     * новый продукт 
     * увеличенная потребность относительно стандартных продаж  
     */
    оформитьФайлДляПланаЗакупокExcelПриходыЗаказы() {
        this.приходыЗаказыExcel.создатьExcel()
    }
    /** Поиск покупателя
     * B2b работает с предприятиями (крупными)
     * Там есть отдел закупок им поступает много звонков. Здрасьте мы компания боникс мы хотим предложить масло
     * Клиенты вбивают нас в базу и когда у них заявка они присылают на электронную почту
     * У нас есть потребность 20 литров масла сделайте предложение
     * Узнают в малой степени из интернет 
     * В большей степени когда отправлена презентация
     * Территориальный подход
     * Если менеджер привел клиента с другой области ему никто ничего не скажет
     */
    поискПокупателя() { }
    /** хранение контактов покупателей
     * Контакты хранятся у менеджеров лично
    */
    хранениеКонтактовПокупателей() { }
    /** созданиеДоговора
     * 
     */
    /** получение реквизитов клиента
     * Менеджер высылает реквизиты клиента ОКС
     */
    получитьРеквизитыКлиента() { }

    созданиеДоговора(реквизиты) {
        return {}
    }
    /** согласованиеДоговораСКлиентом */
    согласованиеДоговораСКлиентом(dogovor) { }
    /** выяснение спецификации
     * Оборудование 
     * Тех процесс
     * Документацию
     */
    выяснениеСпецификации() { }
    /** передача Договора ОКС Для Внесения В 1с И Создания Контрагента
     */
    передачаДоговораОКСДляВнесенияВ1сИСозданияКонтрагента(договорСРеквизитами) { }
    /**Новая продажа
     * Сделка: Контрагент хочет купить- Оплатой\Накладной
     * 1.Согласовал товар ,согласовал цену
     * 3.Создать физический договор (с условиями оплаты и доставки)
     * 4.Согласование договора с клиентом
     * 5.Я подписываю договор. Подписал договор
     * 6.ОКС внес договор в 1с
     * 7.Менеджер делает заказ по договору(Резервирование)
     * 8.Высылает счет на согласование- при необходимости
     * 9.если отсрочка везем
     * 10.Если предоплата ждем оплату-везем
     * Остальные не предприятиями а сто и т.д. (из за компетенций)
     * В основном скидка у менеджеров 26%
     * Но иногда цена со скидкой не проходная поэтому приходится называть цену ориентируясь на с\с
     */
    продажаТовара() {
        const реквизиты = this.получитьРеквизитыКлиента()
        const договорСРеквизитами = this.созданиеДоговора(реквизиты)
        this.согласованиеДоговораСКлиентом(договорСРеквизитами)
        this.передачаДоговораОКСДляВнесенияВ1сИСозданияКонтрагента(договорСРеквизитами)
    }
    /** Продажа Товара Тендер
     * Тендера
     * Шеломицкий Виктор Иосифович мониторит тенедера ЭйсТрейд и подается Фукс
     * Есть рамочный договор
     * Есть несколько площадок БСК или Гос закупки (там маленькие заявки-что бы убрать подозрение в корупции)
     * А есть прямо тендер айсТрейд большие закупки милионные . От 50 000 примерно предприятие обязано сделать тендер
     * Алина собирает документы на тендер
     * В основном скидка у менеджеров 26%
     * Но иногда цена со скидкой не проходная поэтому приходится называть цену ориентируясь на с\с
     */
    продажаТовараТендер() {
        const реквизиты = this.получитьРеквизитыКлиента()
        const договорСРеквизитами = this.созданиеДоговора(реквизиты)
        this.согласованиеДоговораСКлиентом(договорСРеквизитами)
        this.передачаДоговораОКСДляВнесенияВ1сИСозданияКонтрагента(договорСРеквизитами)
        this.выяснениеСпецификации()
    }
    /** Продажа Товара Завод
     * Дурович Павел, Саша Совко - работают с  заводами
     * В основном скидка у менеджеров 26%
     * Но иногда цена со скидкой не проходная поэтому приходится называть цену ориентируясь на с\с
     */
    продажаТовараЗавод() {
        const реквизиты = this.получитьРеквизитыКлиента()
        const договорСРеквизитами = this.созданиеДоговора(реквизиты)
        this.согласованиеДоговораСКлиентом(договорСРеквизитами)
        this.передачаДоговораОКСДляВнесенияВ1сИСозданияКонтрагента(договорСРеквизитами)
        this.выяснениеСпецификации()
    }
    /** Продажа под Заказ
     * Здравствуйте нам надо масло продать
     * Да хорошо нам надо такое то определенное масло
     * Ты смотришь на складе есть такое масло или нет
     * Есть хорошо если нет и получилось договориться то ты его заказываешь
     */
    продажаТовараПодЗаказ() { }
    /**
     * В отчетах важны данные:
     * Какой товар и сколько
     * Какая себестоимость
     * За кем зарезервирован
     */
    анализОстатковИзОтчета1с() {
        this.программа1сУпр.сформироватьОтчетАнализДоступностиТоваровНаСкладах()
    }
    анализОстатковИзОтчетаСБСКД() {
        this.отчетыСбс.отчетПоСебестоимости()
    }
    /** Заказ покупателя
     * Что бы заказ уехал 
     * Я делаю заказ
     * Делаю резерв 
     * Делаю комментарий
     * Оформляю заказ по своим клиентам
     */
    внесениеВ1сЗаказаПокупателя() {
        this.программа1сУпр.создатьИПровестиДокументЗаказПокупателя()
        this.контрольРентабильностиПродажи()
    }
    /**В этом году еще не сформировали план продаж
     * Я делаю план продаж на следующий год и согласовываю с ВН потом Антоном и Артемом
     * Делаю план продаж общий. Продал в этом 100 в следящем 110
     * Раскидал по месяцам и кварталам
     * Потом с Антоном и Артемом согласование по каждому бренду исходя из общих цифр
     * Мне все равно какие бренды мне важно выполнить план
     * У Газпром и рос нефть есть продукция сделанная по ГОСТ СССР - не выгодно продавать потому что его делают все и он низкокачественный (нафтан)
     * Есть товар сертифицированный в Германии - качественный выгодно продавать
     */
    участиеВСтратегПланированииПродаж() { }
    /** контроль рентабильности
     * Создавая заказ они контролируют рентабельность
     */
    контрольРентабильностиПродажи() {
        this.отчетыСбс.отчетПоСебестоимости()
    }
}