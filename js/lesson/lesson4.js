{
  console.log('a',`\u0061`);
  console.log('s',`\u20BB7`);

  console.log('s',`\u{20BB7}`);


}


{
  let s='𠮷';
  console.log('length',s.length);
  console.log('0',s.charAt(0));
  console.log('1',s.charAt(1));
  console.log('at0',s.charCodeAt(0));
  console.log('at1',s.charCodeAt(1));


}

{
  console.log(String.fromCharCode("0x20bb7"));
  console.log(String.fromCodePoint("0x20bb7"));
}

{
  let str='\u{20bb7}abc';
  for(let i=0;i<str.length;i++){
    console.log('es5',str[i]);
  }
  for(let code of str){
    console.log('es6',code);
  }
}

{
  let str="string";
  console.log('includes',str.includes("c"));
  console.log('start',str.startsWith('str'));
  console.log('end',str.endsWith('ng'));
}

{
  let str="abc";
  console.log(str.repeat(2));
}

{
  let name="list";
  let info="hello world";
  let m=`i am ${name},${info}`;
  console.log(m);
}

{
  console.log('1'.padStart(2,'0'));
  console.log('1'.padEnd(2,'0'));
}

{
  let user={
    name:'list',
    info:'hello world'
  };
  console.log(abc`i am ${user.name},${user.info}`);
  function abc(s,v1,v2){
    console.log(s,v1,v2);
    return s+v1+v2
  }
}

{
  console.log(String.raw`Hi\n${1+2}`);
  console.log(`Hi\n${1+2}`);
}
