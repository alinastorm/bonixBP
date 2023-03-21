
import { ДекларантПО } from '../_commons/services/декларант/декларант.service'
import { Email } from '../_commons/services/email/email.service'

/**
 * Андрей Достанко Специалист по внешнеэкономической деятельности 
 */
export class АндрейДостанко {

    private ДекларантПО: ДекларантПО
    private emailService: Email



    /** По российским брендам Андрей Достаноко присылает на почту этот файл Артему Чумаку*/
    выслатьФайлзаказаПоРосБрендам() {
        // TODO процесс под вопросом так как это не его дело по идее
        // this.emailService.отправитьЭлектронноеПисьмо()
    }

    /** Я проверяю или корректирую и обратным письмом отправляю конечный файл заказа
     * И на основании этого в личном кабинете газпром он оформляет заказ поставщику 
     * */
    оформитьЗаказВЛичномКабинетеГазпром() {

    }
}