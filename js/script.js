const { of } = rxjs;
const { map } = rxjs.operators;

window.addEventListener("load",script);

async function script(){
    // script principal

    /* El código síncrono no espera a que se ejecute el asíncrono:

       Los números marcan el orden si fuera síncrono. Pero el resultado es:
       1.- Llamando a getAnimal para recuperar el animal
       2.- Ejecutando getAnimal
       4.- Final de la función de obsAnimales (no ha esperado a generar el valor)
       ¡Error! al hacer el subscribe a getAnimales por ser undefined
       3.- ObsAnimales preparado para devolver el observable Perro
    
    console.log("1.- Llamando a getAnimal para recuperar el animal");
    console.log(getAnimal());
    console.log("5.- Después de la llamada a getAnimal");
    */

   /* Procesamiento normal de una promesa - El código síncrono no espera al asíncrono 
      Resultado:   Otro código síncrono
                   Mi animal es un perro  
   promAnimales().then(anim => console.log("Mi animal es un ", anim))
                 .catch(err => console.log("Se ha producido un error: ",err));
   console.log("Otro código síncrono");  
   */

   /* ASYNC-AWAIT (SÓLO FUNCIONA CON PROMESAS) - Espera por el valor de la 
      promesa, lo desenvuelve y lo asigna a una variable. 

      En este caso ponemos la función script como async al principio.
      
      Resultado: Mi animal es un.. perro
                 Otro código síncrono.

   try {
     // Si la promesa se resuelve
     let animal = await promAnimales();    
     console.log("Mi animal es un..", animal);
   } catch (error) {
     // En el caso de que se rechace la promesa
     console.log("Se ha producido un error ",error);  
   }
   console.log("Otro código síncrono");
   */

  /* ASYNC-AWAIT con observables. Primero hay que convertirlo en promesa con toPromise.
     Resultado: Mi animal es un.. perro
                 Otro código síncrono.
  */
  try {
    // Si la promesa se resuelve
    let animal = await obsAnimales2().toPromise();    
    console.log("Mi animal es un..", animal);
  } catch (error) {
    // En el caso de que se rechace la promesa
    console.log("Se ha producido un error ",error);  
  }
  console.log("Otro código síncrono");

}

function obsAnimales(){
    //Simulamos un retardo de 2sg en recibir la respuesta
    setTimeout(()=>{
        console.log("3.- ObsAnimales preparado para devolver el observable Perro");
        return of('Perro');
        }, 2000);
    console.log("4.- Final de la función de obsAnimales");
}

function obsAnimales2(){
    return of('Perro');
}

function getAnimal(){
    console.log("2.- Ejecutando getAnimal");
    return obsAnimales().subscribe(
        resp => resp
    );
}

function promAnimales(){
    return new Promise((resolve, reject) => resolve("Perro"));
}