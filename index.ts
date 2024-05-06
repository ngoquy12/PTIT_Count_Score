interface IPlayer {
  id: number;
  name: string;
  score: number;
}

class Player implements IPlayer {
  id: number;
  name: string;
  score: number;

  constructor(id: number, name: string, score: number) {
    this.id = id;
    this.name = name;
    this.score = score;
  }
}

class PlayerMain {
  // Khởi tạo hàm constructor có giá trị là dữ liệu lấy từ localStorage
  players: Player[];

  constructor() {
    // Gán lại giá trị cho mảng players là dữ liệu lấy từ localStorage

    const playerLocal = localStorage.getItem("players");

    this.players = playerLocal ? JSON.parse(playerLocal) : [];
  }

  /**
   * Lưu thông tin của palyer lên localStorage
   * Auth: Ngọ Văn Quý (06/05/2024)
   */
  savePlayer() {
    localStorage.setItem("players", JSON.stringify(this.players));
  }

  /**
   * Hàm thêm mới thông tin player
   * @param newPLayer Đối tượng player lấy từ client
   * Auth: Ngọ Văn Quý (06/05/2024)
   */
  createPlayer(newPLayer: Player): void {
    // Push đối tượng newPlayer vào trong mảng players
    this.players.push(newPLayer);
    // Lưu dữ liệu lên localStorage
    this.savePlayer();
  }

  /**
   * Xóa thông tin một player theo id
   * @param playerId id của player cần xóa
   * Auth: Ngọ Văn Quý (06/05/2024)
   */
  removePlayer(playerId: number): void {
    // Lọc ra những player có id khác với id cần xóa
    this.players = this.players.filter(
      (player: Player) => player.id !== playerId
    );
    // Lưu thông tin mảng player mới
    this.savePlayer();
  }

  //   updateScore(type: string, id: number) {}
  handleIncreaseScore(id: number) {
    // Bước 1: Tìm kiếm vị trí của player trong mảng theo id
    const playerIndex = this.players.findIndex(
      (player: Player) => player.id === id
    );

    // Bước 2: Cập nhật số điểm của player sau khi tìm được vị trí của nó
    if (playerIndex === -1) {
      // Trong trường hợp không tìm thấy vị trí của player
      console.log("Không tìm thấy player");
    } else {
      // Trong trường hợp tìm thấy vị trí của player thì tiến hành cập nhật score
      this.players[playerIndex].score++;
    }

    // Bước 3: Lưu dữ liệu mới nhất sau khi cập nhật
    this.savePlayer();
  }

  /**
   * Hàm giảm score
   * @param id Id của socre cần cập nhật
   * Auth: Ngọ Văn Quý (06/05/2024)
   */
  handleDecreaseScore(id: number) {
    // Bước 1: Tìm kiếm vị trí của player trong mảng theo id
    const playerIndex = this.players.findIndex(
      (player: Player) => player.id === id
    );

    // Bước 2: Cập nhật số điểm của player sau khi tìm được vị trí của nó
    if (playerIndex === -1) {
      // Trong trường hợp không tìm thấy vị trí của player
      console.log("Không tìm thấy player");
    } else {
      // Trong trường hợp tìm thấy vị trí của player thì tiến hành cập nhật score
      this.players[playerIndex].score--;
    }

    // Bước 3: Lưu dữ liệu mới nhất sau khi cập nhật
    this.savePlayer();
  }

  /**
   * Tính tổng tất cả các player trong mảng
   * @returns Trả về số lượng player đang có
   * Auth: Ngọ Văn Quý (06/05/2024)
   */
  totalPlayer(): number {
    return this.players.length;
  }

  /**
   * Tính tổng tất cả score của players
   * @returns Tổng số score của các player trong mảng
   * Auth: Ngọ Văn Quý (06/05/2024)
   */
  totalPointer(): number {
    let sum: number = 0;

    // Lặp qua mảng players và tính tổng score của tất player
    this.players.forEach((player: Player) => {
      sum += player.score;
    });

    return sum;
  }
}

// Khởi tạo đối tượng PlayerMain
const playerMain = new PlayerMain();

//#region Khu vực tương tác với DOM
// Lấy ra các element trong DOM
const btnAddPlayerElement = document.querySelector("#btnAdd") as HTMLElement;
const inputElement = document.querySelector("#input") as HTMLInputElement;

console.log(btnAddPlayerElement);

// Các hàm tương tác với DOM
const createPlayer = () => {
  // Chuẩn bị dữ liệu cho đối tượng player
  const newId = Math.ceil(Math.random() * 10000);
  // Khởi tạo đối tượng Player => Hình dung đối tượng Player giống như một Object thông thường
  const player = new Player(newId, inputElement.value, 0);

  // Gọi hàm create
  playerMain.createPlayer(player);

  // Reset giá trị trong ô input
  inputElement.value = "";
};

// Bắt sự kiện trên DOM
// Khi click vào nut Add Player sẽ gọi hàm thêm mới Player
btnAddPlayerElement.addEventListener("click", () => {
  createPlayer();
});
//#endregion
