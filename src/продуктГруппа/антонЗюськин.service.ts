import { ProductService } from './product.service'

/** Бренд менеджеры, продукт группа
 * Антон Зюськин Бренд-менеджер CHAMPION, Senfineco, Paloma, Роснефть
 */

export class AntonZuskin extends ProductService {

    /** подготовить заказ поставщику
     * CHAMPION, Senfineco, Paloma, Роснефть
     */
    подготовитьЗаказПоставщику() {
        return super.подготовитьЗаказПоставщику()
    }
    /** передать заказ поставщику Лекомцеву */
    передатьЗаказПоставщику(ExcelЗаказПоставщику: any) {
        super.передатьЗаказПоставщику(ExcelЗаказПоставщику)
    }
    /** обработать план закупок менеджеров */
    обработатьПланЗакупокМенеджеров() {
        super.обработатьПланЗакупокМенеджеров()
    }
    /** Утверждение скидок заказа покупателя */
    утверждениеСкидокЗаказаПокупателя() {
        super.утверждениеСкидокЗаказаПокупателя()
    }
    /** я создаю файл для нового сотрудника */
    созданиеОтчетностиСбскдСотрудников() {
    }
    /** ручное обновление сбскд
     * автоматически обновляется главный файл из 1с
     * сотрудникам обновляются их excell из главного файла
     *  
     * вроде как починили автоматическое обновление
     */
    обновитьФайлыСотрудниковСбскдВручную(){

    }
}