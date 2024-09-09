// 코드 컨벤션에 맞게 작성하는 연습

// 1부터 10까지 함수를 더하는 함수
const a = () => {
    let b = 0;
    for (i = 1; i <= 10; i++) {
        b += i;
        console.log("sum", b);
    }
};
a();

// 클래스를 생성하고 클래스의 함수를 호출하는 코드
class USER {
    NAME = '홍길동'
    SAYHELLO = () => {
        console.log(`hello, ${this.NAME}`)
    }
}
new USER().SAYHELLO()

// 함수를 호출하여 상품을 추가하는 코드
let product_number = 0
const add_product = () => {
    console.log(`${product_number} 상품을 추가했습니다.`)
}
add_product()