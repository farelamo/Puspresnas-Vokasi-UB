let Db = require("../../database/models")
let mhs = Db.mahasiswa
let jenisLomba = Db.jenisLomba
let Op = Db.Sequelize.Op

module.exports = {
    countData: async (req, res) => {
        try{ 
            let dateStart = req.body.dateStart
            let dateEnd = req.body.dateEnd

            let listDate = [];
            let awal = dateStart;
            let akhir = dateEnd;
            let dateMove = new Date(awal);
            let strDate = awal;

            while (strDate < akhir){
                let strDate = dateMove.toISOString().slice(0,10);
                listDate.push(strDate);
                dateMove.setDate(dateMove.getDate()+1);
            };
            console.log(listDate);
            
            
            let resultDate = []
            for(i = 0; i < listDate.length; i++){
                let tmp = {tanggal: {[Op.like]: `%${listDate[i]}%`}}
                resultDate.push(tmp)
            }
            await jenisLomba.findAll({where: {[Op.or]: resultDate}}) //jenisLomba
            .then(async data => {
                /*
                    1. Looping data dari tabel jenis lomba
                    2. Convert bulan ke string
                       ex, 2022-02-07 diambil 02 aja terus di convert ke string 'Februari'
                    3. setelah convert, save ke array json dengan object month
                    4. save juga id dari data tabel jenis lomba
                    5. buat variable z dengan init 0
                    6. looping data dari tabel mahasiswa di dalam looping json
                    7. cocokkan id di json dengan jenis_lomba_id di data mahasiswa
                    8. increment variable z
                    9. insert object baru yaitu `count` untuk setiap data yang cocok idnya 
                    10. masukkan z pada object count yang sudah di increment tadi 
                */

                let json = []
                data.forEach((t)=>{
                    const text = t.tanggal //2022-02-07
                    const result = text.trim().split("-") //remove "-" will be [2022,02,07] with index [0,1,2]
                    let d = result[1] //index ke 1 yaitu 02
                    let cek = (d < 10) ? d.slice(1,2) : d //less than 10 will remove 0, ex: 02 will be 2
                    const months = [                       // array month
                        "January", "February", "March", 
                        "April", "May", "June", "July", "August", 
                        "September", "October", "November", "December"
                    ]
                    let resMonth = months[parseInt(cek) - 1] //convert to Integer and -1 cause by array month start index at 0
                    json.push({id: t.id, month: resMonth}) //save id and month object
                })
                console.log(json)

                if(dateStart.length == 0 || dateEnd.length == 0){
                    res.status(400).send({
                        status: "false",
                        message: "Invalid !! body cant be empty !!"
                    })
                }else if(data.length < 1){
                    res.status(204).send('Data not found !!')
                }else {
                    let resultData = []
                    for(i = 0; i < data.length; i++){
                        let tmp = {jenis_lomba_id: {[Op.like]: `%${data[i].id}%`}}
                        resultData.push(tmp)
                    }
                    console.log(resultData) 
                    await mhs.findAll({where: {[Op.or]: resultData}}) //mahasiswa
                        .then(result => {
                            
                            json.forEach((j) => {
                                let z = 0;
                                result.forEach((r) => {
                                    if(j.id == r.jenis_lomba_id){
                                        z++ //increment z for every match between json.id and jenis_lomba_id
                                        j.count = z // insert object baru (j.count) dan masukkan z yg tlah di increment
                                    }
                                })
                            })
                            console.log(json)

                            res.status(200).send({
                            status: "true",
                            message: "Successfully get data ! !",
                            data: json
                        })
                    }).catch(err => {
                            res.status(500).send({
                            message: err.message || 'Internal Service Error ! !'
                        })
                    }) 
                }
            }).catch(err => {
                res.status(500).send({
                    message: err.message || 'Internal Service Error ! !'
                })
            })
        }catch {
            res.status(500).send({
                message: 'Internal Service Error ! !'
            })
        }  
    }
}