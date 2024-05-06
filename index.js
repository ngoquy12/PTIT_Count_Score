var Player = /** @class */ (function () {
    function Player(id, name, score) {
        this.id = id;
        this.name = name;
        this.score = score;
    }
    return Player;
}());
var PlayerMain = /** @class */ (function () {
    function PlayerMain() {
        // Gán lại giá trị cho mảng players là dữ liệu lấy từ localStorage
        var playerLocal = localStorage.getItem("players");
        this.players = playerLocal ? JSON.parse(playerLocal) : [];
    }
    /**
     * Lưu thông tin của palyer lên localStorage
     * Auth: Ngọ Văn Quý (06/05/2024)
     */
    PlayerMain.prototype.savePlayer = function () {
        localStorage.setItem("players", JSON.stringify(this.players));
    };
    /**
     * Hàm thêm mới thông tin player
     * @param newPLayer Đối tượng player lấy từ client
     * Auth: Ngọ Văn Quý (06/05/2024)
     */
    PlayerMain.prototype.createPlayer = function (newPLayer) {
        // Push đối tượng newPlayer vào trong mảng players
        this.players.push(newPLayer);
        // Lưu dữ liệu lên localStorage
        this.savePlayer();
    };
    /**
     * Xóa thông tin một player theo id
     * @param playerId id của player cần xóa
     * Auth: Ngọ Văn Quý (06/05/2024)
     */
    PlayerMain.prototype.removePlayer = function (playerId) {
        // Lọc ra những player có id khác với id cần xóa
        this.players = this.players.filter(function (player) { return player.id !== playerId; });
        // Lưu thông tin mảng player mới
        this.savePlayer();
    };
    //   updateScore(type: string, id: number) {}
    PlayerMain.prototype.handleIncreaseScore = function (id) {
        // Bước 1: Tìm kiếm vị trí của player trong mảng theo id
        var playerIndex = this.players.findIndex(function (player) { return player.id === id; });
        // Bước 2: Cập nhật số điểm của player sau khi tìm được vị trí của nó
        if (playerIndex === -1) {
            // Trong trường hợp không tìm thấy vị trí của player
            console.log("Không tìm thấy player");
        }
        else {
            // Trong trường hợp tìm thấy vị trí của player thì tiến hành cập nhật score
            this.players[playerIndex].score++;
        }
        // Bước 3: Lưu dữ liệu mới nhất sau khi cập nhật
        this.savePlayer();
    };
    /**
     * Hàm giảm score
     * @param id Id của socre cần cập nhật
     * Auth: Ngọ Văn Quý (06/05/2024)
     */
    PlayerMain.prototype.handleDecreaseScore = function (id) {
        // Bước 1: Tìm kiếm vị trí của player trong mảng theo id
        var playerIndex = this.players.findIndex(function (player) { return player.id === id; });
        // Bước 2: Cập nhật số điểm của player sau khi tìm được vị trí của nó
        if (playerIndex === -1) {
            // Trong trường hợp không tìm thấy vị trí của player
            console.log("Không tìm thấy player");
        }
        else {
            // Trong trường hợp tìm thấy vị trí của player thì tiến hành cập nhật score
            this.players[playerIndex].score--;
        }
        // Bước 3: Lưu dữ liệu mới nhất sau khi cập nhật
        this.savePlayer();
    };
    /**
     * Tính tổng tất cả các player trong mảng
     * @returns Trả về số lượng player đang có
     * Auth: Ngọ Văn Quý (06/05/2024)
     */
    PlayerMain.prototype.totalPlayer = function () {
        return this.players.length;
    };
    /**
     * Tính tổng tất cả score của players
     * @returns Tổng số score của các player trong mảng
     * Auth: Ngọ Văn Quý (06/05/2024)
     */
    PlayerMain.prototype.totalPointer = function () {
        var sum = 0;
        // Lặp qua mảng players và tính tổng score của tất player
        this.players.forEach(function (player) {
            sum += player.score;
        });
        return sum;
    };
    return PlayerMain;
}());
// Khởi tạo đối tượng PlayerMain
var playerMain = new PlayerMain();
//#region Khu vực tương tác với DOM
// Lấy ra các element trong DOM
var btnAddPlayerElement = document.querySelector("#btnAdd");
var inputElement = document.querySelector("#input");
console.log(btnAddPlayerElement);
// Các hàm tương tác với DOM
var createPlayer = function () {
    // Chuẩn bị dữ liệu cho đối tượng player
    var newId = Math.ceil(Math.random() * 10000);
    // Khởi tạo đối tượng Player => Hình dung đối tượng Player giống như một Object thông thường
    var player = new Player(newId, inputElement.value, 0);
    // Gọi hàm create
    playerMain.createPlayer(player);
    // Reset giá trị trong ô input
    inputElement.value = "";
};
// Bắt sự kiện trên DOM
// Khi click vào nut Add Player sẽ gọi hàm thêm mới Player
btnAddPlayerElement.addEventListener("click", function () {
    createPlayer();
});
//#endregion
